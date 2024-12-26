import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import UserForm from "./Pages/userForm";
import UserInfo from "./Pages/userInfo";
import TodoForm from "./Pages/todoForm";

import styled from "styled-components";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding: 20px;
`;

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <GridContainer>
        <div>
          <h1>Redux Example</h1>
          <UserForm />
          <UserInfo />
        </div>
        <div>
          <TodoForm />
        </div>
      </GridContainer>
    </Provider>
  );
};

export default App;
