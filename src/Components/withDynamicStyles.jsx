// components/withDynamicStyles.js
import { useEffect } from 'react';

const withDynamicStyles = (WrappedComponent, stylePath, styleId) => {
  return function DynamicStylesWrapper(props) {
    useEffect(() => {
      // Ensure only one instance of the dynamic style exists for this specific ID
      let existingStyleLink = document.getElementById(styleId);
      if (existingStyleLink) {
        document.head.removeChild(existingStyleLink);
      }

      const styleLink = document.createElement("link");
      styleLink.id = styleId; // Assign the provided ID to the link element
      styleLink.rel = "stylesheet";
      styleLink.href = stylePath;
      document.head.appendChild(styleLink);

      return () => {
        // Remove the stylesheet when the component unmounts
        document.head.removeChild(styleLink);
      };
    }, [stylePath, styleId]); // Include styleId in the dependency array

    return <WrappedComponent {...props} />;
  };
};

export default withDynamicStyles;
