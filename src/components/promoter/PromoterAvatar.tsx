// components/promoter/PromoterAvatar.tsx
interface PromoterAvatarProps {
  profilePic?: string;
  firstName: string;
  lastName: string;
  size?: "sm" | "md" | "lg";
}

export const PromoterAvatar = ({
  profilePic,
  firstName,
  lastName,
  size = "md",
}: PromoterAvatarProps) => {
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
  };

  if (profilePic) {
    return (
      <img
        src={profilePic}
        alt={firstName}
        className={`${sizeClasses[size]} rounded-full object-cover`}
      />
    );
  }

  return (
    <div
      className={`${sizeClasses[size]} rounded-full bg-[#A50034] text-white flex items-center justify-center font-semibold`}
    >
      {firstName[0]}
      {lastName[0]}
    </div>
  );
};
