const formatNumber = function(number)
{
    if(number<1000)
        return number
    else
    {
        var formattedNum = Math.round(number/100) / 10;
        return formattedNum + "k "
    }

}

export default formatNumber;