import axios from 'axios'

export const fetcher = (args: any) => axios.get(args).then((res) => res.data)
