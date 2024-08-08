import React, { Component } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Header from '../Header';
import Footer from '../Footer';
import './Layout.css';

export class Layout extends Component {
  displayName = Layout.name

  render() {
    return (
      <Container>
        <Row>
          <Col sm={12} >
            <div className="main-container">
              <Header />
              {this.props.children}
              <Footer />
            </div>
          </Col>
          </Row>
      </Container>
    );
  }
}
