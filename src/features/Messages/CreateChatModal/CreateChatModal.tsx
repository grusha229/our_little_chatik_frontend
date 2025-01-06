import React from 'react'
import Modal from '../../controls/Modal/Modal'
import Button from '../../controls/Button/Button'
import CreateChatForm from '../CreateChatForm/CreateChatForm'

export default function CreateChatModal() {
  return (
    <Modal
        name='create_chat'
        header={<h3>Create chat</h3>}
    >
        <CreateChatForm />
    </Modal>
  )
}
