'use client';


import css from "./EditProfilePage.module.css"
import Image from "next/image";
import { useAuthStore } from "@/lib/store/authStore";
import { updateUser } from "@/lib/api/clientApi";
import { UpdateUserRequest } from "@/types/user";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";


const EditProfile = () => {
    const { user } = useAuthStore();
    const setUser = useAuthStore((state) => state.setUser);
  const userName = user?.username ?? "";
  const router = useRouter();
  const redirect = () => router.push("/profile");
    const close = () => router.back();
    
    const handleSubmit = async (formData: FormData) => {
    try {
      const value = Object.fromEntries(formData) as UpdateUserRequest;
      const updatedUser = await updateUser(value);
      setUser(updatedUser);
      toast.success("Your changes have been saved.");
      redirect();
    } catch {
      toast.error(
        "Failed to update profile. Please check your data and try again."
      );
    }
  };



    return (
        <main className={css.mainContent}>
            <div className={css.profileCard}>
            <h1 className={css.formTitle}>Edit Profile</h1>

    <Image
          src={user?.avatar || "https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png"}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

    <form action={handleSubmit} className={css.profileInfo}>
      <div className={css.usernameWrapper}>
        <label htmlFor="username">Username:</label>
          <input id="username"
          name="username"
          type="text"
          className={css.input}
          defaultValue={userName}
         required
        />
      </div>

      <p>Email: {user?.email}</p>

      <div className={css.actions}>
        <button type="submit" className={css.saveButton}>
          Save
        </button>
        <button type="button" className={css.cancelButton} onClick={close}>
          Cancel
        </button>
      </div>
    </form>
  </div>
</main>

    )
}

export default EditProfile