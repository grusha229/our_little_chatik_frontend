import React, { useCallback } from 'react'
import style from './MessagesSearchForm.module.scss';
import { useChatsSearchMutation } from '../../../services/chat';
import { IChatsSearchMessagesPayload } from '../../../models/chats';
import { useForm } from 'react-hook-form';
import debounce from '../../../utils/debounce';
import Input from '../../controls/Input/Input';

export interface IProps {
    onFocus: () => void;
    onBlur: () => void;
}

export default function MessagesSearchForm({
  onBlur,
  onFocus
}: IProps) {

    const { register, handleSubmit, getValues} = useForm<IChatsSearchMessagesPayload>({
      mode: 'onChange',
    });

    const [ searchMessages ] = useChatsSearchMutation();

    const handleInputBlur = useCallback(() => {
      if (getValues().text.length > 0) return

      onBlur();
    }, [getValues, onBlur])

    const handleSubmitSearchForm = async (formData: IChatsSearchMessagesPayload) => {
      try {
        await searchMessages(formData).unwrap();
      } catch (error) {
        console.error("Failed to update user:", error);
      }
    };

    return (
      <form
          onChange={handleSubmit(debounce(handleSubmitSearchForm, 500))}
          className={style['form']}
      >
              <Input
                  name="text"
                  placeholder='Search'
                  register={register}
                  onFocus={onFocus}
                  rules={{
                    required: true,
                    onBlur: handleInputBlur,
                  }}
              />
      </form>
    )
}