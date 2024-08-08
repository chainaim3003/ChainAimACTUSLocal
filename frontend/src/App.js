import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Form } from './components/Form';
import { Results } from './components/Results';
import { Landing } from './components/Landing';
import { NotFound } from './components/NotFound';
import './styles/App.css';

class App extends Component {
  render() {
    return (
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/form/:id" element={<Form />} />
          <Route path="/results" element={<Results />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    );
  }
}

export default App;
