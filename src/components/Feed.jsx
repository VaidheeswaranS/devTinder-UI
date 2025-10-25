import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUsersToFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
import { Link } from "react-router-dom";

const Feed = () => {
  const dispatch = useDispatch();
  const feedData = useSelector((store) => store.feed);

  const getFeed = async () => {
    try {
      // getting the feeds for the user from DB
      const feed = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });

      // setting up the redux store with feed data
      dispatch(addUsersToFeed(feed.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    feedData.length === 0 && getFeed();
  }, []);

  if (!feedData || feedData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <p className="text-base text-white leading-relaxed">
          Wow, you've swiped through everyone! 😎 Hang tight—new profiles are
          joining daily. Check back soon for fresh connections!{" "}
          <Link
            to="/connections"
            className="btn btn-link text-secondary no-underline px-1 py-1"
          >
            Tap here
          </Link>{" "}
          to go to your connections
        </p>
      </div>
    );
  } else {
    // Additional safety check before mapping
    if (!Array.isArray(feedData)) {
      console.error("feedData is not an array:", feedData);
      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Error loading data
          </h2>
        </div>
      );
    }

    return (
      <div className="ml-5 flex flex-wrap my-16">
        {feedData.map((feed) => (
          <UserCard key={feed._id} user={feed} showButtons={true} />
        ))}
      </div>
    );
  }
};

export default Feed;
