import React, { ChangeEvent, useCallback, useMemo, useState } from "react";
import { useForm, Controller, set } from "react-hook-form";
import { Autocomplete, Box, Chip, TextField } from "@mui/material";
import { useSearchQuery } from "../../../services/users";
import MessagesChatItem from "../MessagesChatItem/MessagesChatItem";
import Button from "../../controls/Button/Button";
import debounce from "../../../utils/debounce";
import { ICurrentUserInfoResponse } from "../../../models/users";
import { ChatType, IChatsCreateChatPayload } from "../../../models/chats";
import styles from "./CreateChatForm.module.scss";
import { useCreateMutation } from "../../../services/chat";
import { closeModal } from "../../../store/features/modals";
import { useAppDispatch } from "../../../store/store";
import { muiInputStyles } from "./CreateChatForm.utils";

export interface IUsersOption {
    id: string;
    name: string;
    avatar: string;
    nickname: string;
    label: string;
}

export default function CreateChatForm() {
  const [selectedUsers, setSelectedUsers] = useState<ICurrentUserInfoResponse[]>([]);

  const [ createChat, error ] = useCreateMutation();
  const apiError = error?.error
  let apiErrorText = apiError?.data?.message;

  if (apiError?.status === 403) {
    apiErrorText = apiError?.data?.properties?.description
  }
  

  const { control, handleSubmit, formState: { errors, isValid, isSubmitting }, setValue, getValues} = useForm<IChatsCreateChatPayload>({
    defaultValues: {
      participants_ids: [],
      participants: [],
      chat_type: ChatType.PRIVATE
    },
  });

  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useAppDispatch();

  const isGroup = getValues('participants_ids').length > 1

  const { data, isLoading, isFetching, isError } = useSearchQuery({ nickname: searchTerm }, {
    skip: !searchTerm,
    refetchOnMountOrArgChange: true,
  });

  const handleInputChange = useCallback((e, v) => {
    setSearchTerm(e?.target?.value || '');
  }, []);

  const onSubmit = async (formData: any) => {
    console.log("Form Data:", formData);

    try {
      const response = await createChat(formData).unwrap();
      console.log("Ответ от сервера:", response);
      dispatch(closeModal('create_chat'))
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className={styles['form']}>
      {selectedUsers.length > 0 && (
        <Box mb={2}>
          {selectedUsers.map((user) => (
            <Chip
              key={user.user_id}
              label={`${user.name} ${user.surname}`}
              onDelete={() => {
                const filteredTags = selectedUsers.filter((selectedUser) => selectedUser.user_id !== user.user_id) || [];
                setSelectedUsers(filteredTags);
                setValue("participants_ids", filteredTags.map((user) => user.user_id));
                setValue("participants", filteredTags);

                if (filteredTags.length < 1) {
                  setValue('chat_type', ChatType.PRIVATE);
                }
              }
              }
              sx={{ margin: 0.5 }}
              color="primary"
            />
          ))}
        </Box>
      )}

      <Controller
        name="participants"
        control={control}
        rules={{ required: "Choose at least one participant" }}
        render={({ field }) => (
          <Autocomplete
            {...field}
            sx={muiInputStyles}
            multiple
            loading={isLoading || isFetching}
            options={data || []}
            getOptionKey={(option) => option.user_id}
            getOptionLabel={(option) => `${option.name} ${option.surname}`}
            isOptionEqualToValue={(option, value) => option.user_id === value?.user_id}
            filterOptions={(options) => options}
            renderTags={() => null}
            renderOption={(props, option) => (
              <li  {...props} key={option.user_id}>
                <MessagesChatItem heading={`${option.name} ${option.surname}`} last_message={option.nickname} img_src={option.avatar} />
              </li>
            )}
            onInputChange={debounce(handleInputChange, 500)}
            renderInput={(params) => (
              <TextField
                sx={muiInputStyles}
                slotProps={{
                  inputLabel: {
                    sx: muiInputStyles,
                  }
                }}
                {...params}
                label="Find participants"
                error={!!errors.participants}
                helperText={errors.participants?.message}
                color="primary"
              />
            )}
            onChange={(event, value) => {
              field.onChange(value);
              setValue('participants_ids', value.map((user) => user.user_id));
              setSelectedUsers(value)
              if (value.length > 1) {
                setValue('chat_type', ChatType.GROUP);
              }
            }}
          />
        )}
      />
      {isGroup && (
        <Controller
          name="name"
          control={control}
          rules={{ required: isGroup && "Enter chat name" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Enter chat name"
              error={!!errors.participants}
              helperText={errors.participants?.message}
              color="primary"
              sx={muiInputStyles}
              slotProps={{
                inputLabel: {
                  sx: {
                    color: "#fff",
                    '&.Mui-focused': {
                      color: '#fcc521', // Цвет при фокусе
                    },
                  }
                }
              }}
            />
          )}
        />
      )}
      <Button
        type="submit"
        block
        disabled={!isValid || isSubmitting}
      >
        Create chat
      </Button>
      {apiError && (
          <div className='error'>
            {apiErrorText}
          </div>
      )}
    </form>
  );
}
