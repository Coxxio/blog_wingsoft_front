import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardHeader, Fab } from "@mui/material";
import * as dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPost, getOnePost } from "../app/services/post/postThunk";
import { setNewIndex } from "../app/services/post/postSlice";
import { Container } from "@mui/system";
import {
  ArrowCircleLeftOutlined,
  ArrowCircleRightOutlined,
} from "@mui/icons-material";

export default function CardDetail() {
  const index = useSelector((state) => state.post.index);
  const next = useSelector((state) => state.post.next);
  const previous = useSelector((state) => state.post.previous);
  const post_actual = useSelector((state) => state.post.post_actual);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  React.useEffect(() => {
    dispatch(fetchPost());
    dispatch(getOnePost(id));
  }, [dispatch, id, index]);

  const GoPrevious = async () => {
    await dispatch(setNewIndex(index - 1));
    navigate(`/post/${previous}`);
  };

  const GoNext = async () => {
    await dispatch(setNewIndex(index + 1));
    navigate(`/post/${next}`);
  };
  return (
    <Box>
      <Box
        // component="div"
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        {next ? (
          <Button size="large" onClick={GoNext}>
            <ArrowCircleLeftOutlined />
            Next
          </Button>
        ) : <div></div>}
        {previous ? (
          <Button size="large" onClick={GoPrevious}>
            Previous
            <ArrowCircleRightOutlined />
          </Button>
        ) : <div></div>}
      </Box>
      <Card variant="outlined" sx={{ minWidth: 275 }}>
        <CardHeader
          title={post_actual.title}
          subheader={
            "Fecha de Publicacion: " +
            dayjs(post_actual.pub_date).format("DD/MM/YYYY")
          }
        />
        <CardContent>
          <Typography variant="h5" component="div">
            {post_actual.resume}
          </Typography>

          <Typography variant="body2">{post_actual.content}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
