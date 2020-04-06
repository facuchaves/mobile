/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable no-return-assign */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable no-extra-boolean-cast */
/* eslint-disable no-unused-consts */
import React, { Fragment } from 'react'
import { SafeAreaView, StyleSheet, Button } from 'react-native'
import { ModalSelectList } from 'react-native-modal-select-list'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
})

const createStaticModalOptions = data => {
  let options = []
  if (data) {
    options = data.map(item => {
      return { label: item.nombre, value: item.id }
    })
  }
  return options
}

const SelectList = props => {
  const { options } = props
  const staticModalOptions = createStaticModalOptions(options)
  let modalRef
  const openModal = () => modalRef.show()
  const saveModalRef = ref => (modalRef = ref)
  const onSelectedOption = value => {
    console.log(`You selected: ${value}`)
  }
  return (
    <Fragment>
      <SafeAreaView style={styles.container}>
        <Button title="Open Modal" onPress={openModal} />
      </SafeAreaView>
      <ModalSelectList
        style={{ margin: 20 }}
        ref={saveModalRef}
        placeholder="Selecciones un lugar de trabajo..."
        closeButtonText="Close"
        options={staticModalOptions}
        onSelectedOption={onSelectedOption}
        disableTextSearch={false}
        // provider={props.options}
        // pageSize={40}
        // inputName="customFilterKey"
        // filter={resolveFilters}
        headerTintColor="#329af0"
        buttonTextColor="white"
      />
    </Fragment>
  )
}

export default SelectList
