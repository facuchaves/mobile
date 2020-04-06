/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { Dimensions } from 'react-native'
import { Body, Grid, Col } from 'native-base'
import i18n from '../../../i18n'
import CheckBoxItem from '../../../shared/ui-kit/checkbox'
import Accordian from '../../../shared/ui-kit/Accordion'

export default class FiltroEstado extends Component {
  Options = () => {
    return (
      <Body
        style={{
          width: Dimensions.get('screen').width,
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        <Grid>
          <Col style={{ height: 150 }}>
            <CheckBoxItem
              text={i18n.t('mis_postulaciones:filtros:estados:todos')}
              value={null}
              handleChange={this.filterAction}
              checked={this.isChecked('')}
            />
            <CheckBoxItem
              text={i18n.t('mis_postulaciones:filtros:estados:incompleto')}
              value="INCOMPLETO"
              handleChange={this.filterAction}
              checked={this.isChecked('INCOMPLETO')}
            />
            <CheckBoxItem
              text={i18n.t('mis_postulaciones:filtros:estados:contactadas')}
              value="CONTACTADO"
              handleChange={this.filterAction}
              checked={this.isChecked('CONTACTADO')}
            />
          </Col>
          <Col style={{ height: 150 }}>
            <CheckBoxItem
              text={i18n.t('mis_postulaciones:filtros:estados:enviadas')}
              value="RECIBIDO"
              handleChange={this.filterAction}
              checked={this.isChecked('RECIBIDO')}
            />
            <CheckBoxItem
              text={i18n.t('mis_postulaciones:filtros:estados:leido')}
              value="LEIDO"
              handleChange={this.filterAction}
              checked={this.isChecked('LEIDO')}
            />
            <CheckBoxItem
              text={i18n.t('mis_postulaciones:filtros:estados:finalizadas')}
              value="FINALIZADA"
              handleChange={this.filterAction}
              checked={this.isChecked('FINALIZADA')}
            />
          </Col>
        </Grid>
      </Body>
    )
  }

  isChecked = checkboxValue => {
    const { estados } = this.props
    return checkboxValue ? new Set(estados).has(checkboxValue) : estados.toString() === checkboxValue
  }

  filterAction = value => {
    const { handleChange } = this.props
    handleChange(value)
  }

  render() {
    return <Accordian title="Filtros" data={this.Options} />
  }
}
