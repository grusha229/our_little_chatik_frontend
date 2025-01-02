import React, { useCallback } from 'react'
import style from './MessagesSearchForm.module.scss';
import { useSearchMutation } from '../../../services/search';
import { ISearchPayload } from '../../../models/search';
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

    const { register, handleSubmit, getValues} = useForm<ISearchPayload>({
      mode: 'onChange',
    });

    const [ search ] = useSearchMutation();

    const handleInputBlur = useCallback(() => {
      if (getValues().text.length > 0) return

      onBlur();
    }, [getValues, onBlur])

    const handleSubmitSearchForm = async (formData: ISearchPayload) => {
      try {
        await search(formData).unwrap();
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
                  className={style['input']}
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