import React, { useEffect, useState } from "react";
import "./App.css";
import AboutMe from "./components/AboutMe";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Main from "./components/Main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProjectPage from "./pages/ProjectPage";

const App: React.FC = () => {
  //dark mode
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "enabled";
  });

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  const darkModeToggle = () => {
    setIsDarkMode((preMode) => {
      const newMode = !preMode;
      localStorage.setItem("darkMode", newMode ? "enabled" : "disabled");
      return newMode;
    });
  };
  //show animation
  const showAboutMe = (sectionId: string) => {
    const aboutMeTitle: HTMLElement | null =
      document.querySelector(".aboutMeTitle");
    const aboutMeContent: HTMLElement | null =
      document.querySelector(".aboutMeContent");

    const changeStyle = (opacity: number, transform: number) => {
      if (aboutMeTitle) {
        aboutMeTitle.style.opacity = opacity.toString();
        aboutMeTitle.style.transform = `translateX(-${transform}px)`;
      }

      if (aboutMeContent) {
        aboutMeContent.style.opacity = opacity.toString();
        aboutMeContent.style.transform = `translateX(${transform}px)`;
      }
    };

    if (sectionId === "aboutMe") changeStyle(1, 0);
    else changeStyle(0, 500);
  };

  const showProjects = (sectionId: string) => {
    const projects: HTMLElement | null = document.querySelector(".projects");

    const changeStyle = (
      opacity: number,
      transform: number,
      visibility: string
    ) => {
      if (projects) {
        projects.style.opacity = opacity.toString();
        projects.style.transform = `translateY(${transform}px)`;
        projects.style.visibility = visibility;
      }
    };
    if (sectionId === "projects") changeStyle(1, 0, "visible");
    else changeStyle(0, -1000, "hidden");
  };

  const showContact = (sectionId: string) => {
    const contactTitle: HTMLElement | null =
      document.querySelector(".contactTitle");
    const contactContent: HTMLElement | null =
      document.querySelector(".contactContent");

    const changeStyle = (opacity: number, transform: number) => {
      if (contactTitle) {
        contactTitle.style.opacity = opacity.toString();
        contactTitle.style.transform = `translateX(-${transform}px)`;
      }

      if (contactContent) {
        contactContent.style.opacity = opacity.toString();
        contactContent.style.transform = `translateX(${transform}px)`;
      }
    };

    if (sectionId === "contact") changeStyle(1, 0);
    else changeStyle(0, 500);
  };
  //-----------------------------------------------------
  const downButton = (sectionId: string) => {
    const targetOffset = document.getElementById(sectionId)?.offsetTop || 0;

    window.scrollTo({
      top: targetOffset,
      behavior: "smooth",
    });
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: "smooth",
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const aboutMeOffset = document.getElementById("aboutMe")?.offsetTop || 0;
      const projectsOffset =
        document.getElementById("projects")?.offsetTop || 0;
      const contactOffset = document.getElementById("contact")?.offsetTop || 0;

      if (scrollPosition < aboutMeOffset - 500) showAboutMe("");
      else if (
        scrollPosition >= aboutMeOffset - 100 &&
        scrollPosition < aboutMeOffset + 500
      ) {
        showAboutMe("aboutMe");
        showProjects("");
      } else if (
        scrollPosition >= projectsOffset - 100 &&
        scrollPosition < projectsOffset + 500
      ) {
        showProjects("projects");
        showAboutMe("");
        showContact("");
      } else if (
        scrollPosition >= contactOffset - 100 &&
        scrollPosition < contactOffset + 500
      ) {
        showProjects("");
        showContact("contact");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
              <nav className="sectionMenu">
                <ul className="sectionList">
                  <li onClick={() => scrollToSection("")}>Home</li>
                  <li onClick={() => scrollToSection("aboutMe")}>About Me</li>
                  <li onClick={() => scrollToSection("projects")}>Projects</li>
                  <li onClick={() => scrollToSection("contact")}>Contact</li>
                  <button onClick={darkModeToggle} className="modeToggle">
                    {isDarkMode ? (
                      <li className="moon">DARK</li>
                    ) : (
                      <li className="sun">LIGHT</li>
                    )}
                  </button>
                </ul>
              </nav>

              <Main downButton={() => downButton("aboutMe")} />
              <AboutMe id="aboutMe" downButton={() => downButton("projects")} />
              <Projects
                id="projects"
                downButton={() => downButton("contact")}
              />
              <Contact id="contact" />
            </div>
          }
        />
        <Route
          path="/projects/:id"
          element={
            <ProjectPage
              isDarkMode={isDarkMode}
              darkModeToggle={darkModeToggle}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
