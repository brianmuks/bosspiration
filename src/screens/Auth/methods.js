/**  @format
 * @flow
 */

import { fetchLocalProfile } from "../../db/actions";




export const checkAuthStatus = async ({ }) => {
    return await fetchLocalProfile({});

};