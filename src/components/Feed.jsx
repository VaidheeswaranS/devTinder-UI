import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeeds } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feedData = useSelector((store) => store.feed);

  const getFeed = async () => {
    try {
      const feed = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      console.log(feed.data);

      // setting up the redux store with feed data
      dispatch(addFeeds(feed.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    !feedData && getFeed();
  }, []);

  return (
    feedData && (
      // <div className="flex justify-center my-16">
      //   <UserCard user={feedData[1]} />
      // </div>

      <div className="flex flex-wrap my-16">
        {feedData.map((feed) => (
          <UserCard key={feed._id} user={feed} />
        ))}
        {/* <UserCard user={feedData[1]} /> */}
      </div>
    )
  );
};

export default Feed;
