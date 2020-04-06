import React from 'react'
import { storiesOf } from '@storybook/react'
import { Button } from './Button'
import { ContainerFluid, Row, Col } from '../grid/Grid'

storiesOf('Button', module)
  .add('Link', () => (
    <ContainerFluid>
      <Row>
        <h4 style={{ margin: '5px 10px 0', fontWeight: '600' }}>Button - Link</h4>
      </Row>
      <Row>
        <h4 style={{ margin: '10px' }}>Button Link - Large</h4>
      </Row>
      <Row>
        <Col>
          <Button size="large" variant="default" link>
            Default
          </Button>
        </Col>
        <Col>
          <Button size="large" variant="primary" link>
            Primary
          </Button>
        </Col>
        <Col>
          <Button size="large" variant="secondary" link>
            Secondary
          </Button>
        </Col>
        <Col>
          <Button size="large" disabled link>
            Disabled
          </Button>
        </Col>
      </Row>
      <Row>
        <h4 style={{ margin: '10px' }}>Button Link - Medium</h4>
      </Row>
      <Row>
        <Col>
          <Button variant="default" link>
            Default
          </Button>
        </Col>
        <Col>
          <Button variant="primary" link>
            Primary
          </Button>
        </Col>
        <Col>
          <Button variant="secondary" link>
            Secondary
          </Button>
        </Col>
        <Col>
          <Button disabled link>
            Disabled
          </Button>
        </Col>
      </Row>
      <Row>
        <h4 style={{ margin: '10px' }}>Button Link - Small</h4>
      </Row>
      <Row>
        <Col>
          <Button size="small" variant="default" link>
            Default
          </Button>
        </Col>
        <Col>
          <Button size="small" variant="primary" link>
            Primary
          </Button>
        </Col>
        <Col>
          <Button size="small" variant="secondary" link>
            Secondary
          </Button>
        </Col>
        <Col>
          <Button size="small" disabled link>
            Disabled
          </Button>
        </Col>
      </Row>
    </ContainerFluid>
  ))
  .add('Link with Icon', () => (
    <ContainerFluid>
      <Row>
        <h4 style={{ margin: '5px 10px 0', fontWeight: '600' }}>Button Link - With Icon - Left</h4>
      </Row>
      <Row>
        <h4 style={{ margin: '10px' }}>Button Link Large</h4>
      </Row>
      <Row>
        <Col>
          <Button size="large" variant="default" icon="icon-light-add-circle" link>
            Button
          </Button>
        </Col>
        <Col>
          <Button size="large" variant="primary" icon="icon-light-add-circle" link>
            Button
          </Button>
        </Col>
        <Col>
          <Button size="large" variant="secondary" icon="icon-light-add-circle" link>
            Button
          </Button>
        </Col>
        <Col>
          <Button size="large" disabled icon="icon-light-add-circle" link>
            Button
          </Button>
        </Col>
      </Row>
      <Row>
        <h4 style={{ margin: '10px' }}>Button Link Medium</h4>
      </Row>
      <Row>
        <Col>
          <Button variant="default" icon="icon-light-add-circle" link>
            Button
          </Button>
        </Col>
        <Col>
          <Button variant="primary" icon="icon-light-add-circle" link>
            Button
          </Button>
        </Col>
        <Col>
          <Button variant="secondary" icon="icon-light-add-circle" link>
            Button
          </Button>
        </Col>
        <Col>
          <Button disabled icon="icon-light-add-circle" link>
            Button
          </Button>
        </Col>
      </Row>
      <Row>
        <h4 style={{ margin: '10px' }}>Button Link Small</h4>
      </Row>
      <Row>
        <Col>
          <Button size="small" variant="default" icon="icon-light-add-circle" link>
            Button
          </Button>
        </Col>
        <Col>
          <Button size="small" variant="primary" icon="icon-light-add-circle" link>
            Button
          </Button>
        </Col>
        <Col>
          <Button size="small" variant="secondary" icon="icon-light-add-circle" link>
            Button
          </Button>
        </Col>
        <Col>
          <Button size="small" disabled icon="icon-light-add-circle" link>
            Button
          </Button>
        </Col>
      </Row>
      <Row>
        <h4 style={{ margin: '50px 10px 0', fontWeight: '600' }}>Button Link - With Icon - Right</h4>
      </Row>
      <Row>
        <h4 style={{ margin: '10px' }}>Button Link Large</h4>
      </Row>
      <Row>
        <Col>
          <Button size="large" variant="default" icon="icon-light-add-circle" iconPosition="right" link>
            Button
          </Button>
        </Col>
        <Col>
          <Button size="large" variant="primary" icon="icon-light-add-circle" iconPosition="right" link>
            Button
          </Button>
        </Col>
        <Col>
          <Button size="large" variant="secondary" icon="icon-light-add-circle" iconPosition="right" link>
            Button
          </Button>
        </Col>
        <Col>
          <Button size="large" disabled icon="icon-light-add-circle" iconPosition="right" link>
            Button
          </Button>
        </Col>
      </Row>
      <Row>
        <h4 style={{ margin: '10px' }}>Button Link Medium</h4>
      </Row>
      <Row>
        <Col>
          <Button variant="default" icon="icon-light-add-circle" iconPosition="right" link>
            Button
          </Button>
        </Col>
        <Col>
          <Button variant="primary" icon="icon-light-add-circle" iconPosition="right" link>
            Button
          </Button>
        </Col>
        <Col>
          <Button variant="secondary" icon="icon-light-add-circle" iconPosition="right" link>
            Button
          </Button>
        </Col>
        <Col>
          <Button disabled icon="icon-light-add-circle" iconPosition="right" link>
            Button
          </Button>
        </Col>
      </Row>
      <Row>
        <h4 style={{ margin: '10px' }}>Button Link Small</h4>
      </Row>
      <Row>
        <Col>
          <Button size="small" variant="default" icon="icon-light-add-circle" iconPosition="right" link>
            Button
          </Button>
        </Col>
        <Col>
          <Button size="small" variant="primary" icon="icon-light-add-circle" iconPosition="right" link>
            Button
          </Button>
        </Col>
        <Col>
          <Button size="small" variant="secondary" icon="icon-light-add-circle" iconPosition="right" link>
            Button
          </Button>
        </Col>
        <Col>
          <Button size="small" disabled icon="icon-light-add-circle" iconPosition="right" link>
            Button
          </Button>
        </Col>
      </Row>
    </ContainerFluid>
  ))
  .add('Text', () => (
    <ContainerFluid>
      <Row>
        <h4 style={{ margin: '5px 10px 0', fontWeight: '600' }}>Button</h4>
      </Row>
      <Row>
        <h4 style={{ margin: '10px' }}>Button - Large</h4>
      </Row>
      <Row>
        <Col>
          <Button size="large" variant="default">
            Default
          </Button>
        </Col>
        <Col>
          <Button size="large" variant="primary">
            Primary
          </Button>
        </Col>
        <Col>
          <Button size="large" variant="secondary">
            Secondary
          </Button>
        </Col>
        <Col>
          <Button size="large" disabled>
            Disabled
          </Button>
        </Col>
        <Col>
          <Button size="large" variant="primary" outline>
            Primary
          </Button>
        </Col>
        <Col>
          <Button size="large" disabled outline>
            Disabled
          </Button>
        </Col>
      </Row>
      <Row>
        <h4 style={{ margin: '10px' }}>Button - Medium</h4>
      </Row>
      <Row>
        <Col>
          <Button variant="default">Default</Button>
        </Col>
        <Col>
          <Button variant="primary">Primary</Button>
        </Col>
        <Col>
          <Button variant="secondary">Secondary</Button>
        </Col>
        <Col>
          <Button disabled>Disabled</Button>
        </Col>
        <Col>
          <Button variant="primary" outline>
            Primary
          </Button>
        </Col>
        <Col>
          <Button disabled outline>
            Disabled
          </Button>
        </Col>
      </Row>
      <Row>
        <h4 style={{ margin: '10px' }}>Button - Small</h4>
      </Row>
      <Row>
        <Col>
          <Button size="small" variant="default">
            Default
          </Button>
        </Col>
        <Col>
          <Button size="small" variant="primary">
            Primary
          </Button>
        </Col>
        <Col>
          <Button size="small" variant="secondary">
            Secondary
          </Button>
        </Col>
        <Col>
          <Button size="small" disabled>
            Disabled
          </Button>
        </Col>
        <Col>
          <Button size="small" variant="primary" outline>
            Primary
          </Button>
        </Col>
        <Col>
          <Button size="small" disabled outline>
            Disabled
          </Button>
        </Col>
      </Row>
      <Row>
        <h4 style={{ margin: '10px' }}>Button - Block</h4>
      </Row>
      <Row style={{ margin: '10px 0' }}>
        <Button variant="default" block>
          Default
        </Button>
      </Row>
      <Row style={{ margin: '10px 0' }}>
        <Button variant="primary" block>
          Primary
        </Button>
      </Row>
      <Row style={{ margin: '10px 0' }}>
        <Button variant="secondary" block>
          Secondary
        </Button>
      </Row>
      <Row style={{ margin: '10px 0' }}>
        <Button disabled block>
          Disabled
        </Button>
      </Row>
      <Row style={{ margin: '10px 0' }}>
        <Button variant="primary" outline block>
          Primary
        </Button>
      </Row>
      <Row style={{ margin: '10px 0' }}>
        <Button disabled outline block>
          Disabled
        </Button>
      </Row>
    </ContainerFluid>
  ))
  .add('Icon', () => (
    <ContainerFluid>
      <Row>
        <h4 style={{ margin: '5px 10px 0', fontWeight: '600' }}>Button - Icon</h4>
      </Row>
      <Row>
        <h4 style={{ margin: '10px' }}>Button Large</h4>
      </Row>
      <Row>
        <Col>
          <Button size="large" variant="default" icon="icon-light-add-circle" />
        </Col>
        <Col>
          <Button size="large" variant="primary" icon="icon-light-add-circle" />
        </Col>
        <Col>
          <Button size="large" variant="secondary" icon="icon-light-add-circle" />
        </Col>
        <Col>
          <Button size="large" disabled icon="icon-light-add-circle" />
        </Col>
        <Col>
          <Button size="large" variant="primary" outline icon="icon-light-add-circle" />
        </Col>
        <Col>
          <Button size="large" disabled outline icon="icon-light-add-circle" />
        </Col>
      </Row>
      <Row>
        <h4 style={{ margin: '10px' }}>Button Medium</h4>
      </Row>
      <Row>
        <Col>
          <Button variant="default" icon="icon-light-add-circle" />
        </Col>
        <Col>
          <Button variant="primary" icon="icon-light-add-circle" />
        </Col>
        <Col>
          <Button variant="secondary" icon="icon-light-add-circle" />
        </Col>
        <Col>
          <Button disabled icon="icon-light-add-circle" />
        </Col>
        <Col>
          <Button variant="primary" outline icon="icon-light-add-circle" />
        </Col>
        <Col>
          <Button disabled outline icon="icon-light-add-circle" />
        </Col>
      </Row>
      <Row>
        <h4 style={{ margin: '10px' }}>Button Small</h4>
      </Row>
      <Row>
        <Col>
          <Button size="small" variant="default" icon="icon-light-add-circle" />
        </Col>
        <Col>
          <Button size="small" variant="primary" icon="icon-light-add-circle" />
        </Col>
        <Col>
          <Button size="small" variant="secondary" icon="icon-light-add-circle" />
        </Col>
        <Col>
          <Button size="small" disabled icon="icon-light-add-circle" />
        </Col>
        <Col>
          <Button size="small" variant="primary" outline icon="icon-light-add-circle" />
        </Col>
        <Col>
          <Button size="small" disabled outline icon="icon-light-add-circle" />
        </Col>
      </Row>
    </ContainerFluid>
  ))
  .add('Text with Icon', () => (
    <ContainerFluid>
      <Row>
        <h4 style={{ margin: '5px 10px 0', fontWeight: '600' }}>Button - With Icon - Left</h4>
      </Row>
      <Row>
        <h4 style={{ margin: '10px' }}>Button Large</h4>
      </Row>
      <Row>
        <Col>
          <Button size="large" variant="default" icon="icon-light-add-circle">
            Button
          </Button>
        </Col>
        <Col>
          <Button size="large" variant="primary" icon="icon-light-add-circle">
            Button
          </Button>
        </Col>
        <Col>
          <Button size="large" variant="secondary" icon="icon-light-add-circle">
            Button
          </Button>
        </Col>
        <Col>
          <Button size="large" disabled icon="icon-light-add-circle">
            Button
          </Button>
        </Col>
        <Col>
          <Button size="large" variant="primary" outline icon="icon-light-add-circle">
            Button
          </Button>
        </Col>
        <Col>
          <Button size="large" disabled outline icon="icon-light-add-circle">
            Button
          </Button>
        </Col>
      </Row>
      <Row>
        <h4 style={{ margin: '10px' }}>Button Medium</h4>
      </Row>
      <Row>
        <Col>
          <Button variant="default" icon="icon-light-add-circle">
            Button
          </Button>
        </Col>
        <Col>
          <Button variant="primary" icon="icon-light-add-circle">
            Button
          </Button>
        </Col>
        <Col>
          <Button variant="secondary" icon="icon-light-add-circle">
            Button
          </Button>
        </Col>
        <Col>
          <Button disabled icon="icon-light-add-circle">
            Button
          </Button>
        </Col>
        <Col>
          <Button variant="primary" outline icon="icon-light-add-circle">
            Button
          </Button>
        </Col>
        <Col>
          <Button disabled outline icon="icon-light-add-circle">
            Button
          </Button>
        </Col>
      </Row>
      <Row>
        <h4 style={{ margin: '10px' }}>Button Small</h4>
      </Row>
      <Row>
        <Col>
          <Button size="small" variant="default" icon="icon-light-add-circle">
            Button
          </Button>
        </Col>
        <Col>
          <Button size="small" variant="primary" icon="icon-light-add-circle">
            Button
          </Button>
        </Col>
        <Col>
          <Button size="small" variant="secondary" icon="icon-light-add-circle">
            Button
          </Button>
        </Col>
        <Col>
          <Button size="small" disabled icon="icon-light-add-circle">
            Button
          </Button>
        </Col>
        <Col>
          <Button size="small" variant="primary" outline icon="icon-light-add-circle">
            Button
          </Button>
        </Col>
        <Col>
          <Button size="small" disabled outline icon="icon-light-add-circle">
            Button
          </Button>
        </Col>
      </Row>
      <Row>
        <h4 style={{ margin: '50px 10px 0', fontWeight: '600' }}>Button - With Icon - Right</h4>
      </Row>
      <Row>
        <h4 style={{ margin: '10px' }}>Button Large</h4>
      </Row>
      <Row>
        <Col>
          <Button size="large" variant="default" icon="icon-light-add-circle" iconPosition="right">
            Button
          </Button>
        </Col>
        <Col>
          <Button size="large" variant="primary" icon="icon-light-add-circle" iconPosition="right">
            Button
          </Button>
        </Col>
        <Col>
          <Button size="large" variant="secondary" icon="icon-light-add-circle" iconPosition="right">
            Button
          </Button>
        </Col>
        <Col>
          <Button size="large" disabled icon="icon-light-add-circle" iconPosition="right">
            Button
          </Button>
        </Col>
        <Col>
          <Button size="large" variant="primary" outline icon="icon-light-add-circle" iconPosition="right">
            Button
          </Button>
        </Col>
        <Col>
          <Button size="large" disabled outline icon="icon-light-add-circle" iconPosition="right">
            Button
          </Button>
        </Col>
      </Row>
      <Row>
        <h4 style={{ margin: '10px' }}>Button Medium</h4>
      </Row>
      <Row>
        <Col>
          <Button variant="default" icon="icon-light-add-circle" iconPosition="right">
            Button
          </Button>
        </Col>
        <Col>
          <Button variant="primary" icon="icon-light-add-circle" iconPosition="right">
            Button
          </Button>
        </Col>
        <Col>
          <Button variant="secondary" icon="icon-light-add-circle" iconPosition="right">
            Button
          </Button>
        </Col>
        <Col>
          <Button disabled icon="icon-light-add-circle" iconPosition="right">
            Button
          </Button>
        </Col>
        <Col>
          <Button variant="primary" outline icon="icon-light-add-circle" iconPosition="right">
            Button
          </Button>
        </Col>
        <Col>
          <Button disabled outline icon="icon-light-add-circle" iconPosition="right">
            Button
          </Button>
        </Col>
      </Row>
      <Row>
        <h4 style={{ margin: '10px' }}>Button Small</h4>
      </Row>
      <Row>
        <Col>
          <Button size="small" variant="default" icon="icon-light-add-circle" iconPosition="right">
            Button
          </Button>
        </Col>
        <Col>
          <Button size="small" variant="primary" icon="icon-light-add-circle" iconPosition="right">
            Button
          </Button>
        </Col>
        <Col>
          <Button size="small" variant="secondary" icon="icon-light-add-circle" iconPosition="right">
            Button
          </Button>
        </Col>
        <Col>
          <Button size="small" disabled icon="icon-light-add-circle" iconPosition="right">
            Button
          </Button>
        </Col>
        <Col>
          <Button size="small" variant="primary" outline icon="icon-light-add-circle" iconPosition="right">
            Button
          </Button>
        </Col>
        <Col>
          <Button size="small" disabled outline icon="icon-light-add-circle" iconPosition="right">
            Button
          </Button>
        </Col>
      </Row>
    </ContainerFluid>
  ))
