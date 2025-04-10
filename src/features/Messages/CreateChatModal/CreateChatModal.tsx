import Modal from '@app/ui/Modal/Modal';
import CreateChatForm from '@app/features/Messages/CreateChatForm/CreateChatForm';

export default function CreateChatModal() {
    return (
        <Modal name="create_chat" header={<h3>Create chat</h3>}>
            <CreateChatForm />
        </Modal>
    );
}
