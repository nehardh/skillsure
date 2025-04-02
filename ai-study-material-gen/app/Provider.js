"use client"
import React, { useEffect } from "react";
import { useUser } from '@clerk/nextjs';
import { db } from '@/configs/db';
import { USER_TABLE } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import axios from "axios";

function Provider({ children }) {
    const { user } = useUser();
    useEffect (() => {
        user && CheckIsNewUser();
    }, [user]);

    const CheckIsNewUser = async () => {
        //Check if user exists
        const result = await db
            .select()
            .from(USER_TABLE)
            .where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress));
        console.log(result);
        if(result?.length == 0) {
            //If not, add to the database
            const userResp = await db.insert(USER_TABLE).values({
                name: user?.fullName,
                email: user?.primaryEmailAddress?.emailAddress,
            }).returning({ id: USER_TABLE.id });
            console.log(userResp);
        }

        // const resp = await axios.post('/api/create-user', { user: user });
        // console.log(resp.data);
    }

  return (
    <div>
        { children }
    </div>
  )
}

export default Provider