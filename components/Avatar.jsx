const Avatar = ({ name, imageUrl }) => {
  const getInitials = (name) => {
    const initials = name?.split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
    return initials;
  };

  return (
    <div className="size-12 md:size-16 mr-4 rounded-full border object-cover border-gray-600">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={`${name}'s Avatar`}
          className="avatar-image rounded-full"
        />
      ) : (
        <div className="grid place-items-center p-4 text-gray-400 text-xl font-bold">
          {getInitials(name)}
        </div>
      )}
    </div>
  );
};

export default Avatar;
