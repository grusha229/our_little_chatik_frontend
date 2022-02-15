import {createMain} from "../main";
import {createAbout} from "../about";
import {createFormLogin, createFormSignup} from "../form";
import {createChats} from "./index";

export let chatList = [
    {
        firstName: "Gena1",
        secondName: "Kulybin1",
        lastMessage: "Хаха давно тебя не было в уличных гонках",
        avatar: "https://sun1-56.userapi.com/s/v1/ig2/TKkl65HTd89flyYIKFD0dJaQc0x4llX-d5gV8cIepbHsefqY7sVW3PSorBal7rhXukpV-8OOdElXoao1WPNEdJwR.jpg?size=200x200&quality=96&crop=0,408,1620,1620&ava=1",
        time: "18:31"
    },
    {
        firstName: "Gena2",
        secondName: "Kulybin2",
        lastMessage: "2Хаха давно тебя не было в уличных гонках",
        avatar: "https://sun1-56.userapi.com/s/v1/ig2/TKkl65HTd89flyYIKFD0dJaQc0x4llX-d5gV8cIepbHsefqY7sVW3PSorBal7rhXukpV-8OOdElXoao1WPNEdJwR.jpg?size=200x200&quality=96&crop=0,408,1620,1620&ava=1",
        time: "11:32"
    },
    {
        firstName: "Gena3",
        secondName: "Kulybin3",
        lastMessage: "3Хаха давно тебя не было в уличных гонках",
        avatar: "https://sun1-56.userapi.com/s/v1/ig2/TKkl65HTd89flyYIKFD0dJaQc0x4llX-d5gV8cIepbHsefqY7sVW3PSorBal7rhXukpV-8OOdElXoao1WPNEdJwR.jpg?size=200x200&quality=96&crop=0,408,1620,1620&ava=1",
        time: "11:30"
    },
    {
        firstName: "Gena4",
        secondName: "Kulybin4",
        lastMessage: "4Хаха давно тебя не было в уличных гонках",
        avatar: "https://sun1-56.userapi.com/s/v1/ig2/TKkl65HTd89flyYIKFD0dJaQc0x4llX-d5gV8cIepbHsefqY7sVW3PSorBal7rhXukpV-8OOdElXoao1WPNEdJwR.jpg?size=200x200&quality=96&crop=0,408,1620,1620&ava=1",
        time: "11:30"
    },
    {
        firstName: "Gena5",
        secondName: "Kulybin5",
        lastMessage: "5Хаха давно тебя не было в уличных гонках",
        avatar: "https://sun1-56.userapi.com/s/v1/ig2/TKkl65HTd89flyYIKFD0dJaQc0x4llX-d5gV8cIepbHsefqY7sVW3PSorBal7rhXukpV-8OOdElXoao1WPNEdJwR.jpg?size=200x200&quality=96&crop=0,408,1620,1620&ava=1",
        time: "11:30"
    },
    {
        firstName: "Gena6",
        secondName: "Kulybin6",
        lastMessage: "6Хаха давно тебя не было в уличных гонках",
        avatar: "https://sun1-56.userapi.com/s/v1/ig2/TKkl65HTd89flyYIKFD0dJaQc0x4llX-d5gV8cIepbHsefqY7sVW3PSorBal7rhXukpV-8OOdElXoao1WPNEdJwR.jpg?size=200x200&quality=96&crop=0,408,1620,1620&ava=1",
        time: "11:30"
    },
    {
        firstName: "Gena7",
        secondName: "Kulybin7",
        lastMessage: "7Хаха давно тебя не было в уличных гонках",
        avatar: "https://sun1-56.userapi.com/s/v1/ig2/TKkl65HTd89flyYIKFD0dJaQc0x4llX-d5gV8cIepbHsefqY7sVW3PSorBal7rhXukpV-8OOdElXoao1WPNEdJwR.jpg?size=200x200&quality=96&crop=0,408,1620,1620&ava=1",
        time: "11:30"
    },
    {
        firstName: "Gena8",
        secondName: "Kulybin8",
        lastMessage: "8Хаха давно тебя не было в уличных гонках",
        avatar: "https://sun1-56.userapi.com/s/v1/ig2/TKkl65HTd89flyYIKFD0dJaQc0x4llX-d5gV8cIepbHsefqY7sVW3PSorBal7rhXukpV-8OOdElXoao1WPNEdJwR.jpg?size=200x200&quality=96&crop=0,408,1620,1620&ava=1",
        time: "11:30"
    },
    {
        firstName: "Gena9",
        secondName: "Kulybin9",
        lastMessage: "9Хаха давно тебя не было в уличных гонках",
        avatar: "https://sun1-56.userapi.com/s/v1/ig2/TKkl65HTd89flyYIKFD0dJaQc0x4llX-d5gV8cIepbHsefqY7sVW3PSorBal7rhXukpV-8OOdElXoao1WPNEdJwR.jpg?size=200x200&quality=96&crop=0,408,1620,1620&ava=1",
        time: "11:30"
    },
    {
        firstName: "Gena10",
        secondName: "Kulybin10",
        lastMessage: "10аха давно тебя не было в уличных гонках",
        avatar: "https://sun1-56.userapi.com/s/v1/ig2/TKkl65HTd89flyYIKFD0dJaQc0x4llX-d5gV8cIepbHsefqY7sVW3PSorBal7rhXukpV-8OOdElXoao1WPNEdJwR.jpg?size=200x200&quality=96&crop=0,408,1620,1620&ava=1",
        time: "11:30"
    },
    {
        firstName: "Gena11",
        secondName: "Kulybi1",
        lastMessage: "11Хаха давно тебя не было в уличных гонках",
        avatar: "https://sun1-56.userapi.com/s/v1/ig2/TKkl65HTd89flyYIKFD0dJaQc0x4llX-d5gV8cIepbHsefqY7sVW3PSorBal7rhXukpV-8OOdElXoao1WPNEdJwR.jpg?size=200x200&quality=96&crop=0,408,1620,1620&ava=1",
        time: "11:30"
    },
    {
        firstName: "Gena12",
        secondName: "Kulybin12",
        lastMessage: "12Хаха давно тебя не было в уличных гонках",
        avatar: "https://sun1-56.userapi.com/s/v1/ig2/TKkl65HTd89flyYIKFD0dJaQc0x4llX-d5gV8cIepbHsefqY7sVW3PSorBal7rhXukpV-8OOdElXoao1WPNEdJwR.jpg?size=200x200&quality=96&crop=0,408,1620,1620&ava=1",
        time: "11:30"
    },
]
