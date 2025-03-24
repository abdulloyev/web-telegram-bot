import "./App.css";

import React from "react";
import { getData } from "./constants/db";
import Card from "./components/card/card";

const App = () => {
  // Courses contained dataBase
  const courses = getData();

  return (
    <>
      <h1 className="heading">Sammi kurslari</h1>

      {/* Cards */}
      <div className="cards_container">
        {courses.map(course => (
          <Card key={course.id} course={course} />
        ))}
      </div>
    </>
  );
};

export default App;
