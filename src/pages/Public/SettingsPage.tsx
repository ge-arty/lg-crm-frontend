import { useState, type ChangeEvent } from "react";
import { Camera, User } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";

const SettingsPage = () => {
  const { authUser, updateProfile, isUpdatingProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const getInitials = () => {
    if (!authUser) return "U";
    const firstName = authUser.firstName || "";
    const lastName = authUser.lastName || "";
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const base64Image = reader.result as string;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className='max-w-4xl mx-auto space-y-6'>
      {/* Page Header */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-900 mb-2'>Settings</h1>
        <p className='text-gray-600'>
          Manage your account settings and preferences
        </p>
      </div>

      {/* Profile Picture Section */}
      <div className='bg-white rounded-xl border border-gray-200 p-6 shadow-sm'>
        <h2 className='text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2'>
          <Camera size={24} className='text-[#A50034]' />
          Profile Picture
        </h2>

        <div className='flex flex-col md:flex-row items-center gap-6'>
          {/* Avatar Display */}
          <div className='relative'>
            {selectedImg || authUser?.profilePic ? (
              <img
                src={selectedImg || authUser?.profilePic}
                alt='Profile'
                className='w-32 h-32 rounded-full object-cover border-4 border-gray-200 shadow-lg'
              />
            ) : (
              <div className='w-32 h-32 rounded-full bg-gradient-to-br from-[#A50034] to-[#C4003C] flex items-center justify-center text-white text-4xl font-bold shadow-lg border-4 border-gray-200'>
                {getInitials()}
              </div>
            )}

            {/* Upload Button Overlay */}
            <label
              htmlFor='profile-upload'
              className='absolute bottom-0 right-0 bg-[#A50034] hover:bg-[#C4003C] text-white p-3 rounded-full cursor-pointer shadow-lg transition-all duration-200 hover:scale-110'
            >
              <Camera size={18} />
              <input
                id='profile-upload'
                type='file'
                accept='image/*'
                className='hidden'
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
              />
            </label>
          </div>

          {/* Upload Instructions */}
          <div className='flex-1 text-center md:text-left'>
            <h3 className='font-semibold text-gray-900 mb-2'>
              Upload new picture
            </h3>
            <p className='text-sm text-gray-600 mb-4'>
              JPG, PNG or GIF. Max size 2MB. Recommended 400x400px.
            </p>
            <label
              htmlFor='profile-upload-btn'
              className='btn btn-sm bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300 rounded-lg'
            >
              {isUpdatingProfile ? (
                <span className='loading loading-spinner loading-sm' />
              ) : (
                "Choose File"
              )}
              <input
                id='profile-upload-btn'
                type='file'
                accept='image/*'
                className='hidden'
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
              />
            </label>
          </div>
        </div>
      </div>

      {/* Personal Information Section (Disabled) */}
      <div className='bg-white rounded-xl border border-gray-200 p-6 shadow-sm opacity-60'>
        <h2 className='text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2'>
          <User size={24} className='text-gray-400' />
          Personal Information
          <span className='ml-auto text-xs bg-gray-200 text-gray-600 px-3 py-1 rounded-full'>
            Coming Soon
          </span>
        </h2>
      </div>
    </div>
  );
};

export default SettingsPage;
