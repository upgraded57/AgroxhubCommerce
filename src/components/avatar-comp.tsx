export default function AvatarComp({
  size,
  username,
}: {
  size: 'sm' | 'md' | 'lg'
  username?: string
}) {
  const userInitials = `${username?.split(' ')[0][0]}${username?.split(' ')[1][0]}`
  return (
    <div className="avatar avatar-placeholder bg-dark-green-clr text-white rounded-full">
      <div
        className={`${size === 'sm' ? 'w-8' : size === 'md' ? 'w-10' : 'w-[80px]'}`}
      >
        <p
          className={`${size === 'sm' ? 'text-xs' : size === 'md' ? 'text-lg' : 'text-2xl font-medium'}`}
        >
          {userInitials}
        </p>
      </div>
    </div>
  )
}
