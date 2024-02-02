import { useEffect } from "react";

const App = () => {
  /*
   * Check if the user prefers dark mode and set the theme accordingly
   */
  useEffect(() => {
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (prefersDarkMode) {
      document.body.setAttribute("data-theme", "dark");
    }
  }, []);

  return (
    <>
      <h1>Test</h1>
    </>
  );
};

export default App;
