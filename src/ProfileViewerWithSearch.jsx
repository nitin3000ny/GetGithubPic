import { useState, useEffect } from "react";
import ProfileSearchForm from "./ProfileSearchForm";

const url = "https://api.github.com/users";

function ProfileViewerWithSearch() {
  const [username, setUsername] = useState("nitin3000ny");
  const [profile, setProfile] = useState({ data: null, isLoading: true });

  useEffect(() => {
    async function fetchUser() {
      const userResultRes = await fetch(`${url}/${username}`);
      const userResult = await userResultRes.json();
      setProfile({ data: userResult, isLoading: false });
    }
    fetchUser();
    console.log('called')
  }, [username]);

  function search(username) {
    setProfile({ data: null, isLoading: true });
    setUsername(username);
  }

  if (profile.isLoading) return <i>Loading...</i>;

  return (
    <div>
      <ProfileSearchForm search={search} />
      {profile.data && (
        <div>
          <b>{profile.data.name}</b>
          <img src={profile.data.avatar_url} alt="" />
        </div>
      )}
    </div>
  );
}

export default ProfileViewerWithSearch;
