import React from 'react';
import Navbar from "../component/Navbar";

const MainPage = () => {
  return (
    <div className="default">
      <Navbar />
      <div className="main-content">
        <h1>Welcome to the Generated Justifications App</h1>
        <p>This is the main page of the application. From here, you can navigate to different sections of the application using the navigation bar above.</p>

        <div className="additional-content">
          <p>Explore the features of the app and enjoy your experience.</p>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
