import s from "./Modal.module.css"
import {useDispatch, useSelector} from "react-redux";
import {useCallback} from "react";
import {toggleVisible} from "../../store/modalSlice.js";

const Modal = (props) => {

    const isModalVisible = useSelector(state => state.modal.isVisible)

    const dispatch = useDispatch();

    const toggleModalVisibility = useCallback(()=> {
            dispatch(toggleVisible())
        },[dispatch,isModalVisible])

    return (
        <div className={`${s.modal} ${(props.active) ? s.visible:''}`} onClick={toggleModalVisibility}>
            <div className={s.content} onClick={(e) => {e.stopPropagation()}}>
                {props.children}
            </div>
        </div>
    )
}

export default Modal
