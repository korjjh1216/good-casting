import { userService } from '../service/index';
import Swal from 'sweetalert2';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const signup = createAsyncThunk(
    'SIGN_UP',
    async (arg, { rejectWithValue }) => {
        if (arg.password.trim().length === 0) {
            Swal.fire({
                icon: 'error',
                title: '유효하지 않은 비밀번호입니다.',
                text: '다른 비밀번호를 입력해주세요',
            });
        }

        if (arg.username.trim().length === 0) {
            Swal.fire({
                icon: 'error',
                title: '유효하지 않은 아이디입니다.',
                text: '다른 아이디를 입력해주세요',
            });
        }

        try {
            const response = await userService.signup(arg);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);

export const signin = createAsyncThunk('SIGN_IN', async (arg) => {
    console.log('reducer signin() arg: ' + JSON.stringify(arg));
    const response = await userService.signin(arg);

    if (response.data[0].token === 'Wrong password') {
        return;
    }
    return response.data;
});

export const updateUserInfo = createAsyncThunk(
    'UPDATE_USER_INFO',
    async (user) => {
        console.log(user);
        const response = await userService.update(user);

        return response.data;
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        actor: {},
        producer: {},
        loggedIn: false,
    },
    reducers: {
        isUserLoggendIn(state, { payload }) {
            state.loggedIn = payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signup.fulfilled, (state, { payload }) => {
                console.log('회원가입() payload' + JSON.stringify(payload));
                Swal.fire({
                    icon: 'success',
                    title: '회원가입이 완료되었습니다!',
                });
            })
            .addCase(signup.rejected, (state, { payload }) => {
                console.log('payload: ' + JSON.stringify(payload));
                if (payload.message.includes('중복된') || null) {
                    Swal.fire({
                        icon: 'error',
                        title: '중복된 아이디입니다!',
                        text: '다른 아이디를 입력해주세요',
                        footer: '<a href>Why do I have this issue?</a>',
                    });
                }
                if (payload.message.includes('Validation') || null) {
                    Swal.fire({
                        icon: 'error',
                        title: '유효하지 않은 정보입니다.',
                        text: '다른 정보를 입력해주세요',
                        footer: '<a href>Why do I have this issue?</a>',
                    });
                }
            })
            .addCase(signin.fulfilled, (state, { payload }) => {
                if (payload !== undefined) {
                    localStorage.setItem('TOKEN', 'Bearer ' + payload[0].token);
                    localStorage.setItem('USER', JSON.stringify(payload));
                    state.loggedIn = !state.loggedIn;
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: '비밀번호를 다시 입력해주세요.',
                    });
                }
            })
            .addCase(updateUserInfo.fulfilled, (state, { payload }) => {
                if (!payload) {
                    Swal.fire({
                        icon: 'error',
                        title: '현재 비밀번호가 일치하지 않습니다.',
                    });
                }
            });
    },
});
export const userSelector = (state) => state.userReducer;

export const { isUserLoggendIn } = userSlice.actions;
export default userSlice.reducer;
