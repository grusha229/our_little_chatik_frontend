import Modal from '@app/ui/Modal/Modal';
import CreateConversationForm from '../CreateConversationForm/CreateConversationForm';

export default function CreateConversationFormModal() {
    return (
        <Modal name="create_chat" header={<h3>Create chat</h3>}>
            <CreateConversationForm />
        </Modal>
    );
}
