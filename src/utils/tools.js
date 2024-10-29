import { ElNotification } from 'element-plus';

function NotifySuccess(message) {
    ElNotification({
        message: message,
        type: 'success',
    })
}

function NotifyError(message) {
    ElNotification({
        message: message,
        type: 'error',
    })
}

export default { NotifySuccess, NotifyError }