const MessageSkeleton = () => {
	// Create an array of 6 items for skeleton messages
	const skeletonMessages = Array(6).fill(null);

	return (
		<div className="flex-1 overflow-y-auto  space-y-4">
			<div className="border-b p-3 border-base-300">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						{/* Avatar */}
						<div className="avatar">
							<div className="size-10 rounded-full relative">
								<div className="skeleton w-full h-full rounded-full" />
							</div>
						</div>

						{/* User info */}
						<div>
							<div className="chat-header mb-1 flex gap-2">
								<div className="skeleton h-3 w-16" />
								<div className="skeleton h-3 w-20" />
							</div>
							<div className="chat-header mb-1">
								<div className="skeleton h-2 w-12" />
							</div>
						</div>
					</div>
				</div>
			</div>
			{skeletonMessages.map((_, idx) => (
				<div
					key={idx}
					className={`chat ${
						idx % 2 === 0 ? "chat-start" : "chat-end"
					}`}
				>
					<div className="chat-image avatar">
						<div className="size-10 rounded-full">
							<div className="skeleton w-full h-full rounded-full" />
						</div>
					</div>

					<div className="chat-header mb-1">
						<div className="skeleton h-4 w-16" />
					</div>

					<div className="chat-bubble bg-transparent p-0">
						<div className="skeleton h-16 w-[200px]" />
					</div>
				</div>
			))}
		</div>
	);
};

export default MessageSkeleton;
