// components/Home.js

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getDocs, collection } from 'firebase/firestore';
import { firestore } from '../firebase';

const Home = () => {
  const [focusGroups, setFocusGroups] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFocusGroups = async () => {
      try {
        const groupsSnapshot = await getDocs(collection(firestore, 'focus_groups'));
        const groupsData = groupsSnapshot.docs.map((doc) => doc.data());
        setFocusGroups(groupsData);
      } catch (error) {
        console.error('Error fetching focus groups:', error);
      }
    };

    fetchFocusGroups();
  }, []);

  return (
    <div>
      <h1>Welcome to Welisten</h1>
      {focusGroups.map((group) => (
        <div key={group.id}>
          <Link to={`/group/${group.id}`}>{group.name}</Link>
          <br />
        </div>
      ))}
    </div>
  );
};

export default Home;
