import { SvgIconProps } from "@mui/material"



type IconProp = {
    Icon:  React.ComponentType<SvgIconProps>
}


const MenuIcon: React.FC<IconProp> = ({Icon})=>{

    return (
       <Icon/>
   
    )
}



export default MenuIcon;