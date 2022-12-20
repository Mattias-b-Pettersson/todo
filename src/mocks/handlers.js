import { context, rest } from "msw"

const baseURL = "https://todo-mp.herokuapp.com/"

export const handlers = [
    rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
        return res(
            ctx.json({
            pk: 4,
            username: "testaccount2",
            email: "",
            first_name: "",
            last_name: "",
            profile_id: 4,
            profile_image: "https://res.cloudinary.com/dickw3yzm/image/upload/v1/media/../default_profile_b0tpee"
            })
        );
    }),
    rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
        return res(
            ctx.status(200)
        );
    }),
    rest.post(`${baseURL}dj-rest-auth/token/refresh/`, (req, res, ctx) => {
        return res(
            ctx.json({
                refresh: "refresh_token",
                access: "access_token"
            })
        );
    }),
    rest.get(`${baseURL}profile/undefined/`, (req, res, ctx) => {
        return res(
            ctx.json({
            "id":4,
            "owner":"testaccount2",
            "created_at":"2022 Dec 15",
            "updated_at":"2022 Dec 20",
            "name":"test name",
            "content":"About me",
            "image":"https://res.cloudinary.com/dickw3yzm/image/upload/v1/media/../default_profile_b0tpee",
            "is_owner":true
        })
        )
    }),
]