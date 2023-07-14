import Image from "next/image";
import React from "react";

import Avatar from "../../../public/images/profile.jpg";

function ProfileImage() {
  return (
    <Image
      src={Avatar}
      alt="Profile image"
      className="w-[80px] h-[80px] rounded-full mx-auto ring-4 ring-gray-300 mb-[30px]"
    />
  );
}

export default ProfileImage;
