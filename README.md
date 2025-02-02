# Redux Store Refactor - E-Commerce Platform

## Overview
This project is an extra credit challenge that involves refactoring an existing e-commerce platform to use Redux for global state management. The goal is to replace React's Context API with Redux to better handle complex state in a scalable manner.

## Task Description
Your objective is to refactor the e-commerce platform from Activity 26 so that it utilizes Redux instead of Context API. This requires understanding and implementing Redux principles such as:
- Creating a Redux store
- Defining actions and reducers
- Connecting components to the store using Redux hooks

## Why Redux?
Redux is widely used in large-scale applications due to its predictable state management and centralized store. Unlike the Context API, which is best suited for lightweight state management, Redux provides robust tools for handling complex state logic.

## Learning Objective
This challenge is designed to simulate real-world scenarios where developers must learn and apply new technologies based on official documentation. By completing this task, you will gain hands-on experience working with Redux and improve your ability to navigate technical documentation effectively.

## Getting Started
### Prerequisites
- Ensure you have Node.js and npm installed.
- Clone the e-commerce platform repository from Activity 26.
- Install dependencies using `npm install`.

### Steps to Implement Redux
1. **Install Redux & React-Redux**
   ```sh
   npm install redux react-redux
   ```

2. **Create the Redux Store**
   - Set up a `store.js` file.
   - Use `configureStore` from Redux Toolkit for easier configuration.

3. **Define Actions and Reducers**
   - Create action types and action creators.
   - Implement reducers to update state based on dispatched actions.

4. **Connect Redux to the Application**
   - Wrap the application in the `<Provider>` component from `react-redux`.
   - Use Redux hooks (`useSelector` and `useDispatch`) to manage state in components.

## Key Concepts to Review
- [Redux Documentation](https://redux.js.org/)
- [React-Redux Documentation](https://react-redux.js.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)

## Submission Instructions
- Ensure the application functions as expected with Redux.
- Test state updates using Redux DevTools.
- Submit your refactored code along with a brief explanation of your implementation choices.

## Additional Notes
- This exercise emphasizes self-learning and problem-solving using documentation.
- Feel free to optimize the store structure and improve performance where necessary.

---
**Author:** Kristen Shields  
**Project:** Redux Store Refactor - E-Commerce Platform

