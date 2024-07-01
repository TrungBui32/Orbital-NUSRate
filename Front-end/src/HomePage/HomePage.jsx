import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../NavBar/NavBar";
import Component from "./Component/Component";
import Footer from "./Footer/Footer";
import homepageStyles from "./HomePage.module.css";

const urlCourses = "http://localhost:8080/api/course";

const HomePage = () => {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const coursesPerPage = 15;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(urlCourses);
        setCourses(response.data);
      } catch (error) {
        console.log("Error fetching courses", error);
      }
    };
    fetchCourses();
  }, []);

  const filteredCourses = courses.filter(
    (course) =>
      course.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.courseCode.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  const getPagination = () => {
    const paginationArray = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        paginationArray.push(i);
      }
    } else {
      if (currentPage <= 4) {
        paginationArray.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (currentPage >= totalPages - 3) {
        paginationArray.push(
          1,
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        paginationArray.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }
    return paginationArray;
  };

  return (
    <div>
      <NavBar />
      <div className={homepageStyles.search}>
        <input
          type="text"
          placeholder="Search courses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={homepageStyles.searchinput}
        />
      </div>
      <div className={homepageStyles.main}>
        {currentCourses.map((course, index) => (
          <Component key={index} course={course} />
        ))}
      </div>
      <div className={homepageStyles.pagination}>
        {getPagination().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === "number" && paginate(page)}
            className={homepageStyles.pagebutton}
            disabled={page === "..."}
          >
            {page}
          </button>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
