/**  @format
 * @flow
 */

import { fetchLocalProfile } from "../../db/actions";




export const checkAuthStatus = () => fetchLocalProfile({ isgetData: false })