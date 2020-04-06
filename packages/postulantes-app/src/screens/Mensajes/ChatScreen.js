/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
// IMPORTS
import React, { useRef, useState, useEffect } from 'react'
import { View, StyleSheet, ScrollView, FlatList } from 'react-native'
import { Container, Text } from 'native-base'

// SERVICES
import { dismissModal } from '../../navigation/helpers'
import CuentaServices from '../../api/cuenta-service'
import { Loading } from '../../shared/ui-kit'
// THEME
import DefaultTheme from '../../themes/DefaultTheme'
// THEMES
import HeaderChat from './components/headerChat'
import FooterChat from './components/footerChat'

const styles = StyleSheet.create({
  contentMenssage: {
    flex: 1,
    flexGrow: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  itemMenssage: {
    color: DefaultTheme.colors.primaryText,
    fontSize: 13,
    padding: 10,
    marginRight: 0,
    marginBottom: 5,
    borderRadius: 15,
    flexDirection: 'column',
    alignSelf: 'center',
  },
  empresaColor: {
    backgroundColor: '#EDF1F7',
    alignSelf: 'flex-end',
  },
  usuarioColor: {
    backgroundColor: '#FFEBFF',
    alignSelf: 'flex-start',
  },
  menssageText: {
    color: '#666',
  },
  fecha: {
    fontSize: 14,
    alignSelf: 'center',
    lineHeight: 20,
    padding: 16,
    color: DefaultTheme.colors.labelText,
  },
})

const ChatScreen = props => {
  const { idChat, type, componentId, nombreEmpresa, updateMensajes, idMarcaLeido } = props

  const [chat, setChat] = useState([])
  const [loading, setLoading] = useState({ page: true, chat: false })

  let fecha = null

  const scrollView = useRef()

  const getChat = async () => {
    fecha = null
    const data = await CuentaServices.getchat(idChat, type)
    // recuperado el chat se marca como leido
    await CuentaServices.marcarLeidoMensaje(idMarcaLeido)
    await setChat(data)
    setLoading({ ...loading, page: false, chat: false })
  }

  const sendMessage = async (id, message) => {
    setLoading({ ...loading, chat: true })
    await CuentaServices.sendMessage(id, message, type)
    getChat()
  }

  const validateDate = date => {
    if (fecha !== date) {
      fecha = date
      return <Text style={styles.fecha}>{date}</Text>
    }
    return null
  }

  useEffect(() => {
    getChat()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading.page) {
    return Loading.loader('')
  }

  if (!chat.comentarios) {
    dismissModal(componentId)
    return false
  }

  return (
    <Container idChat={idChat}>
      {/* HEADER SEARCH BAR */}
      <HeaderChat
        titulo={type === 'directo' ? nombreEmpresa : chat.titulo}
        closeModal={() => {
          updateMensajes()
          dismissModal(componentId)
        }}
      />
      {/* BODY VIEW */}
      <ScrollView ref={scrollView} onContentSizeChange={() => scrollView.current.scrollToEnd()}>
        <FlatList
          // inverted
          contentContainerStyle={styles.contentMenssage}
          data={chat.comentarios}
          keyExtractor={(item, index) => {
            return String(index)
          }}
          renderItem={({ item }) => {
            const meChat = nombreEmpresa === item.nombre
            return (
              <View key={Math.random()}>
                {validateDate(item.fecha.split(' ')[0])}
                <View style={[styles.itemMenssage, meChat ? styles.usuarioColor : styles.empresaColor]}>
                  <Text note style={styles.menssageText}>
                    {item.mensaje}
                  </Text>
                </View>
              </View>
            )
          }}
        />
      </ScrollView>
      {/* FORM WRITE */}
      {chat.comentarios ? <FooterChat sendMessage={sendMessage} idChat={idChat} loading={loading.chat} /> : null}
    </Container>
  )
}

export default ChatScreen
