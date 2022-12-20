import { rest } from "msw"

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
    rest.post(`${baseURL}/todos/`, (req, res, ctx) => {
        return res(
            ctx.json({
                id: 61,
                owner: "testaccount",
                created_at: "2022 Dec 19",
                updated_at: "2022 Dec 19",
                title: "Todo Lorem ipsum",
                status: "Todo",
                content: "testing content!",
                priority: 3,
                is_owner_or_assigned: false,
                file: null,
                assigned: [
                3
                ],
                assigned_username: [
                "testaccount"
                ],
                profile_id: 3,
                due_date: "2022 Dec 07",
                due_date_has_passed: true
                },
                )
        );
    }),

]