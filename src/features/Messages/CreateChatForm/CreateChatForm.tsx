import React, { ChangeEvent, ChangeEventHandler, useCallback, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Autocomplete, TextField, Button } from "@mui/material";
import { useSearchQuery } from "../../../services/users";
import MessagesChatItem from "../MessagesChatItem/MessagesChatItem";

export default function CreateChatForm() {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      users: [], // Значение по умолчанию
    },
  });

    const [searchTerm, setSearchTerm] = useState('');

    const { data, isLoading, isFetching, isError } = useSearchQuery({ nickname: searchTerm }, {
        skip: !searchTerm,
    });

    const transformedData = useMemo(() => {
        if (!data) return []

        return data.map((user) => ({
            id: user.user_id,
            name: `${user.name} ${user.surname}`,
            avatar: user.avatar,
            nickname: user.nickname,
        }))
    }, [data])

    console.log(transformedData);

    const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        console.log(e?.target?.value);
        setSearchTerm(e?.target?.value || '');
    }, [])

    const onSubmit = (data: any) => {
        console.log("Form Data:", data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Controller
                name="users"
                control={control}
                rules={{ required: "Выберите хотя бы одного пользователя" }}
                render={({ field }) => (
                    <Autocomplete
                        {...field}
                        multiple
                        loading={isLoading || isFetching}
                        options={transformedData}
                        getOptionLabel={(option) => option.id}
                        isOptionEqualToValue={(option, value) => option.id === value?.id}
                        // renderOption={(props, option) => <MessagesChatItem heading={option.name} last_message={option.name} />}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Выберите пользователей"
                                error={!!errors.users}
                                helperText={errors.users?.message}
                                onChange={handleInputChange}
                            />
                        )}
                        onChange={(event, value) => field.onChange(value)}
                    />
                )}
            />

            <Button type="submit" variant="contained" color="primary" style={{ marginTop: "20px" }}>
                Отправить
            </Button>
        </form>
    );
}
