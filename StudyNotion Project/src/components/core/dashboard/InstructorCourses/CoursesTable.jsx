import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Tbody } from "react-super-responsive-table";


export default function CoursesTable( {courses,setCourses} ){
    const dispatch = useDispatch();
    const {token} = useSelector( (state) => state.auth );
    const [loading,setLoading] = useState(false);
    const [confirmationModal,setConfirmationModal] = useState(null)
    
    return(
        <div>
            <Table>
                <Thead>
                    <Tr>
                        <Th>
                            Courses
                        </Th>
                        <Th>
                            Duration
                        </Th>
                        <Th>
                            Price
                        </Th>
                        <Th>
                            Actions
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    
                </Tbody>
            </Table>
        </div>
    )
}

