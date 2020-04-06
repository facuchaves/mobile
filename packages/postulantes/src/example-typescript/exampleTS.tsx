import React, { useEffect, FunctionComponent, useState } from 'react'

export const algo = 1

// example optional props
export interface HelloProps {
  compiler?: string
  framework?: string
}
export const Hello = (props: HelloProps) => (
  <h1>
    Hello from {props.compiler} and {props.framework}!
  </h1>
)

// example required props inline
export interface HelloPropsReq {
  compiler: string
  framework: string
}
export const HelloReq = (props: HelloPropsReq) => (
  <h1>
    Hello from {props.compiler} and {props.framework}!
  </h1>
)

export const Hello2 = (props: { compiler: string; framework: string }) => (
  <h1>
    Hello from {props.compiler} and {props.framework}!
  </h1>
)

// example with default props
export const Hello3 = (props: HelloProps) => {
  const { compiler = 'defaultComp', framework = 'defFramework' } = props

  const [a, seta] = useState(true)
  return (
    <h1>
      Hello from {compiler} and {framework}!
    </h1>
  )
}
//-------------------

interface CardProps {
  title: string
  paragraph?: string
}

export const Card: FunctionComponent<CardProps> = ({ title, paragraph }) => (
  <aside>
    <h2>{title}</h2>
    <p>{paragraph}</p>
  </aside>
)

// --class extend --------------------

interface PieceProps {
  color: 'red' | 'black'
}

const Piece = (props: PieceProps) => <svg />

export class Pawn extends React.Component<PieceProps> {
  public render() {
    return <Piece color={this.props.color} />
  }
}

class King extends Pawn {
  public render() {
    return (
      <React.Fragment>
        <Piece color={this.props.color} />
        <Piece color={this.props.color} />
      </React.Fragment>
    )
  }
}
