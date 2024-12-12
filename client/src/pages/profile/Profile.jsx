import { useAuth } from "../../hooks/useStore";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import { updateUser } from "../../api/api";

export default function Profile() {
  const [profilePicture, setProfilePicture] = useState(null);
  const [error, setError] = useState(null);
  const { user, accessToken, setUser } = useAuth();
  const { data } = user || {};
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      username: data?.username,
      email: data?.email,
      fullname: data?.fullname,
      bio: data?.bio,
    },
  });

  //handle image conversion
  const handleImage = (e) => {
    const file = e.target.files?.[0];
    //check file size no greater than 2mb
    if (file && file.size > 2 * 1024 * 1024) {
      toast.error("File size must be less than 2MB");
      return false;
    }
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.onerror = () => {
        setError("Error reading file");
      };
    }
  };

  const onFormSubmit = async (formData) => {
    const formInfo = {
      ...formData,
      profilePicture: profilePicture,
    };
    try {
      const res = await updateUser(formInfo, accessToken);
      if (res.status === 200) {
        toast.success(res.data.message);
        setUser((prev) => ({
          ...prev,
          data: res.data.user,
        }));
      }
    } catch (error) {
      console.log(error);
      setError(
        error.response.data.message ||
          error?.response.data?.error ||
          error?.message
      );
    }
  };

  return (
    <div className="max-w-[1024px] mx-auto py-6 px-4">
      <div className="md:flex justify-between">
        <div>
          <img
            src={
              data.profilePicture ||
              "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
            }
            alt={data.username}
            className="w-24 h-24"
          />
          <h1 className="mt-4 font-bold text-3xl">{data.fullname}</h1>
          <p>Email : {data.email} </p>
        </div>
        <div className="md:w-[45%]">
          {error && <p className="my-4 text-red-500 text-sm">{error}</p>}
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="input border-2 border-zinc-500 rounded-none"
                name="username"
                {...register("username")}
              />
            </div>
            <div className="flex flex-col gap-2 my-4">
              <label htmlFor="fullname">Fullname</label>
              <input
                type="text"
                className="input border-2 border-zinc-500 rounded-none"
                name="fullname"
                {...register("fullname")}
              />
            </div>
            <div className="flex flex-col gap-2 my-4">
              <label htmlFor="Email">Email</label>
              <input
                type="email"
                className="input border-2 border-zinc-500 rounded-none"
                name="email"
                {...register("email")}
              />
            </div>
            <div>
              <label htmlFor="Bio">Bio</label>
              <textarea
                className="textarea w-full border-2 border-zinc-500 rounded-none"
                placeholder="Bio"
                name="bio"
                {...register("bio")}
              ></textarea>
            </div>
            <div className="mt-4">
              <label htmlFor="ProfilePicture">Upload Profile Image</label>
              <input
                type="file"
                className="file-input w-full max-w-xs border-2"
                accept="image/*"
                {...register("profilePicture")}
                onChange={handleImage}
              />
            </div>
            <button
              type="submit"
              className="btn btn-accent mt-8 w-full text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating..." : "Update"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
