import { ChangeEvent, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, User, Mail } from "lucide-react";

export const convertToWebP = async (file: File): Promise<string> => {
	return new Promise((resolve, reject) => {
		const img = new Image();
		const url = URL.createObjectURL(file);
		img.src = url;

		img.onerror = (e) => {
			URL.revokeObjectURL(url);
			reject(new Error("Ошибка загрузки изображения"));
		};

		img.onload = () => {
			URL.revokeObjectURL(url);
			try {
				const canvas = document.createElement("canvas");
				canvas.width = Math.min(img.width, 2048); // Ограничение размера
				canvas.height = Math.min(img.height, 2048);

				const ctx = canvas.getContext("2d");
				if (!ctx) {
					throw new Error("Canvas context не доступен");
				}

				// Рисуем с сохранением пропорций
				ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

				canvas.toBlob(
					(blob) => {
						if (!blob) {
							reject(new Error("Ошибка создания WebP"));
							return;
						}

						const reader = new FileReader();
						reader.onerror = () =>
							reject(new Error("Ошибка чтения blob"));
						reader.onload = () => resolve(reader.result as string);
						reader.readAsDataURL(blob);
					},
					"image/webp",
					0.7
				); // Оптимальное качество 70-80%
			} catch (e) {
				reject(e);
			}
		};
	});
};
const ProfilePage = () => {
	const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
	const [selectedImage, setSelectedImage] = useState<
		string | ArrayBuffer | null
	>(null);

	const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		try {
			// Добавьте проверку типа файла
			if (!file.type.startsWith("image/")) {
				alert("Пожалуйста, выберите изображение");
				return;
			}

			// Конвертация в WebP
			const webpImage = await convertToWebP(file);

			// Обновление состояния и отправка
			setSelectedImage(webpImage);
			await updateProfile({ profilePicture: webpImage });
		} catch (error) {
			console.error("Ошибка конвертации:", error);
			alert("Не удалось обработать изображение");
		}
	};

	// const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
	// 	const file = e.target.files?.[0];

	// 	if (!file) return;

	// 	const reader = new FileReader();

	// 	reader.readAsDataURL(file);

	// 	reader.onload = async () => {
	// 		const base64Image = reader.result;
	// 		console.log(base64Image);
	// 		setSelectedImage(base64Image);
	// 		await updateProfile({ profilePicture: base64Image });
	// 	};
	// };

	return (
		<div className="h-screen pt-20">
			<div className="max-w-2xl mx-auto p-4 py-8">
				<div className="bg-base-300 rounded-xl p-6 space-y-8">
					<div className="text-center">
						<h1 className="text-2xl font-semibold ">Profile</h1>
						<p className="mt-2">Your profile information</p>
					</div>

					{/* avatar upload section */}

					<div className="flex flex-col items-center gap-4">
						<div className="relative">
							<img
								src={
									(selectedImage as string) ||
									(authUser?.profilePicture as
										| string
										| undefined) ||
									"/avatar.jpg"
								}
								alt="Profile"
								className="size-32 rounded-full object-cover border-4 "
							/>
							<label
								htmlFor="avatar-upload"
								className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${
						isUpdatingProfile
							? "animate-pulse pointer-events-none"
							: ""
					}
                `}
							>
								<Camera className="w-5 h-5 text-base-200" />
								<input
									type="file"
									id="avatar-upload"
									className="hidden"
									accept="image/*"
									onChange={handleImageUpload}
									disabled={isUpdatingProfile}
								/>
							</label>
						</div>
						<p className="text-sm text-zinc-400">
							{isUpdatingProfile
								? "Uploading..."
								: "Click the camera icon to update your photo"}
						</p>
					</div>

					<div className="space-y-6">
						<div className="space-y-1.5">
							<div className="text-sm text-zinc-400 flex items-center gap-2">
								<User className="w-4 h-4" />
								First Name
							</div>
							<p className="px-4 py-2.5 bg-base-200 rounded-lg border">
								{authUser?.firstName}
							</p>
						</div>

						<div className="space-y-1.5">
							<div className="text-sm text-zinc-400 flex items-center gap-2">
								<User className="w-4 h-4" />
								Last Name
							</div>
							<p className="px-4 py-2.5 bg-base-200 rounded-lg border">
								{authUser?.lastName}
							</p>
						</div>

						<div className="space-y-1.5">
							<div className="text-sm text-zinc-400 flex items-center gap-2">
								<Mail className="w-4 h-4" />
								Email Address
							</div>
							<p className="px-4 py-2.5 bg-base-200 rounded-lg border">
								{authUser?.email}
							</p>
						</div>
					</div>
				</div>
				<div className="mt-6 bg-base-300 rounded-xl p-6">
					<h2 className="text-lg font-medium  mb-4">
						Account Information
					</h2>
					<div className="space-y-3 text-sm">
						<div className="flex items-center justify-between py-2 border-b border-zinc-700">
							<span>Member Since</span>
							<span>
								{authUser?.createdAt?.toString().split("T")[0]}
							</span>
						</div>
						<div className="flex items-center justify-between py-2">
							<span>Account Status</span>
							<span className="text-green-500">Active</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfilePage;
