/* eslint-disable import/prefer-default-export */
const { default: Swal } = require('sweetalert2');

export function SwalSuccess(message, popupTimer = 1200) {
  return Swal.fire({
    title: message,
    text: '',
    icon: 'success',
    // confirmButtonColor: '#43a2ff',
    showConfirmButton: false,

    timer: popupTimer,
  });
}

export function SwalError(message, popupTimer = 1200) {
  return Swal.fire({
    title: message,
    text: '',
    icon: 'error',
    // confirmButtonColor: '#43a2ff',
    showConfirmButton: false,

    timer: popupTimer,
  });
}
