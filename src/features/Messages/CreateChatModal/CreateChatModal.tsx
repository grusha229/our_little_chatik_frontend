import React from 'react'
import Modal from '../../controls/Modal/Modal'
import Button from '../../controls/Button/Button'

export default function CreateChatModal() {
  return (
    <Modal
        name='create_chat'
        header={<h3>Create chat</h3>}
        footer={<Button>Send</Button>}
    >
        AAAA
    </Modal>
  )
}
