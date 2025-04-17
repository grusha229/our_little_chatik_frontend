import { useCallback, useEffect, useState } from 'react';
import { useGetAvatarUploadUrlMutation, usePatchCurrentUserInfoMutation } from '@app/services/users';
import { useForm } from 'react-hook-form';
import { ICurrentUserInfoResponse, IUsersPatchCurrentUserPayload, IUsersUploadAvatarLinkResponse } from '@app/models/users';
import styles from './PersonalInfoForm.module.scss';
import Input from '@app/ui/Input/Input';
import Button from '@app/ui/Button/Button/Button';
import UploadFileButton from '@app/ui/Button/UploadFileButton/UploadFileButton';
import { useUploadAttachmentMutation } from '@app/services/files';
import { IErrorResponse } from '@app/services/baseQuery';

export interface IProps {
    user: ICurrentUserInfoResponse;
}

export default function PersonalInfoForm({ user }: IProps) {
    const [fileToUpload, setFileToUpload] = useState<File>();
    const [linkToUpload, setLinkToUpload] = useState<IUsersUploadAvatarLinkResponse>();

    // Инициализация useForm
    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isDirty },
        reset,
        setValue,
        watch,
    } = useForm<IUsersPatchCurrentUserPayload>({
        mode: 'onBlur',
        defaultValues: {
            name: user?.name,
            surname: user?.surname,
            nickname: user?.nickname,
        },
    });

    const watchUploadIds = watch('avatar_upload_id');
    const isAvatarLoaded = watchUploadIds && watchUploadIds.length > 0;

    const [getAttachmentUploadLink, { isSuccess: isLinkSuccessfullyGet, data: fetchedLinkToUpload, isUninitialized }] =
        useGetAvatarUploadUrlMutation();
    const [uploadAttachment] = useUploadAttachmentMutation();

    useEffect(() => {
        reset({
            name: user?.name,
            surname: user?.surname,
            nickname: user?.nickname,
        });
    }, [user, reset]);

    useEffect(() => {
        if (fetchedLinkToUpload && !isUninitialized && isLinkSuccessfullyGet) {
            setLinkToUpload(fetchedLinkToUpload);
        }
    }, [fetchedLinkToUpload, isLinkSuccessfullyGet, isUninitialized, reset]);

    useEffect(() => {
        if (isLinkSuccessfullyGet && !isUninitialized && fileToUpload) {
            uploadAttachment({
                url: linkToUpload?.upload_link ?? '',
                file: fileToUpload,
                content_type: fileToUpload?.type,
            });
        }
    }, [isUninitialized, uploadAttachment, isLinkSuccessfullyGet, fileToUpload, linkToUpload?.upload_link]);

    const [updateUser, error] = usePatchCurrentUserInfoMutation();
    const apiError = error?.error as IErrorResponse;
    let apiErrorText = apiError?.data?.message;

    if (apiError?.status === 403) {
        apiErrorText = apiError?.data?.properties?.description;
    }

    const handleSubmitLinkForm = async (formData: IUsersPatchCurrentUserPayload) => {
        try {
            const response = await updateUser(formData).unwrap();
            console.log('Ответ от сервера:', response);
        } catch (error) {
            console.error('Failed to update user:', error);
        }
    };

    const handleFileChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const files = event.target.files;

            if (files && files?.length > 0) {
                setFileToUpload(files[0]);
                const file = {
                    content_type: files[0].type,
                    name: files[0].name,
                };
                getAttachmentUploadLink(file).then(res => {
                    console.log(res);
                    setValue('avatar_upload_id', res?.data?.upload_id || '');
                });
            }
        },
        [getAttachmentUploadLink, setValue],
    );

    return (
        <form onSubmit={handleSubmit(handleSubmitLinkForm)} className={styles['form']}>
            <UploadFileButton
                className={styles['avatar-button']}
                name="avatar_upload_id"
                handleChange={handleFileChange}
                register={register}
                multiple={false}
            >
                Upload avatar
            </UploadFileButton>
            <div className={styles['description']}>Tap to edit your personal info</div>
            <Input name="name" placeholder={user?.name ?? 'Enter name'} register={register} error={errors.name} />
            <Input name="surname" placeholder={user?.surname ?? 'Enter surname'} register={register} error={errors.surname} />
            <Input name="nickname" placeholder={user?.nickname ?? 'Enter nickname'} register={register} error={errors.nickname} />
            <Input name="email" placeholder={user?.email ?? 'Enter nickname'} disabled register={register} error={errors.nickname} />
            {(isDirty || isAvatarLoaded) && (
                <Button type="submit" block disabled={!isValid}>
                    Change
                </Button>
            )}
            {apiError && <div className="error">{apiErrorText}</div>}
        </form>
    );
}
