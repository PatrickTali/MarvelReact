import React from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import { chooseName, chooseDescription, chooseComics_Appeared_In, chooseSuper_Power, chooseDate_Created} from '../../redux/slices/rootSlice';
import { Input } from '../sharedComponents/Input';
import { serverCalls } from '../../api';
//import { useGetData } from '../../custom-hooks';

interface CharacterFormProps {
    id?:string;
    data?:{}
}

interface CharacterState {
    name: string;
    description: string;
}

export const CharacterForm = (props:CharacterFormProps) => {

    const dispatch = useDispatch();
    
    const store = useStore()
    const name = useSelector<CharacterState>(state => state.name)
    const { register, handleSubmit } = useForm({})

    const onSubmit = async (data:any, event:any) => {
        console.log(props.id)

        if( props.id!){
            await serverCalls.update(props.id!, data)
            console.log(`Updated:${data} ${props.id}`)
            window.location.reload()
            event.target.reset();
        } else {
            dispatch(chooseName(data.name))

            dispatch(chooseDescription(data.description))

            dispatch(chooseComics_Appeared_In(data.comics_appeared_in))

            dispatch(chooseSuper_Power(data.super_power))

            dispatch(chooseDate_Created(data.date_created))


            console.log(store.getState())

            await serverCalls.create(store.getState())

            window.location.reload()
        }
    }

    return (
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name">Name</label>
                    <Input {...register('name')} name="name" placeholder='Name' />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <Input {...register('description')} name="description" placeholder="Description"/>
                </div>
                <div>
                    <label htmlFor="comics_appeared_in">Comics_Appeared_In</label>
                    <Input {...register('comics_appeared_in')} name="comics_appeared_in" placeholder="Comic_appeared_in"/>
                </div>
                <div>
                    <label htmlFor="super_power">Super_Power</label>
                    <Input {...register('super_power')} name="super_power" placeholder="Super_Power"/>
                </div>
                <div>
                    <label htmlFor="date_created">Date_Created</label>
                    <Input {...register('date_created')} name="date_created" placeholder="Date_created"/>
                </div>
                
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}